/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';

import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';
import { UserProfile, BloodPressureLog } from './types';

// Child components
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import ProfileForm from './components/ProfileForm';
import BloodPressureTracker from './components/BloodPressureTracker';
import Education from './components/Education';
import DietGuide from './components/DietGuide';
import Quiz from './components/Quiz';

import { motion, AnimatePresence } from 'motion/react';
import { Heart, Activity } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('beranda');
  const [educationSubTab, setEducationSubTab] = useState('pjk');
  const [bloodPressureLogs, setBloodPressureLogs] = useState<BloodPressureLog[]>([]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingTensi, setSavingTensi] = useState(false);

  // Persistence block for incrementing logins exactly once per browser reload/mount
  const loginRecordedRef = useRef<string | null>(null);

  // Disable dark mode permanently to use light theme exclusively
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  // Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.removeItem('is_guest');
        setAuthLoading(false);
      } else {
        // Retrieve simulated guest mode if enabled
        const savedGuest = localStorage.getItem('is_guest') === 'true';
        if (savedGuest) {
          setCurrentUser({
            uid: 'guest_tamu_jantung',
            email: 'tamu.logjantung@gmail.com',
            isAnonymous: true,
            displayName: 'Tamu Jantung'
          });
        } else {
          setCurrentUser(null);
        }
        setAuthLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Fetch or Register User Profile
  useEffect(() => {
    if (!currentUser) return;

    if (currentUser.uid === 'guest_tamu_jantung') {
      const localProfileStr = localStorage.getItem('guest_profile');
      if (localProfileStr) {
        setProfile(JSON.parse(localProfileStr));
      } else {
        const newProfile: UserProfile = {
          name: 'Tamu Jantung',
          gender: 'Laki-laki',
          weight: 70,
          height: 170,
          bmi: 24.2,
          bmiCategory: 'Normal',
          totalLogins: 1,
          lastLogin: new Date().toISOString()
        };
        localStorage.setItem('guest_profile', JSON.stringify(newProfile));
        setProfile(newProfile);
      }
      setProfileLoading(false);
      return;
    }

    const fetchOrCreateProfile = async () => {
      setProfileLoading(true);
      const profilePath = `profiles/${currentUser.uid}`;
      try {
        const docRef = doc(db, 'profiles', currentUser.uid);
        const docSnap = await getDoc(docRef);

        const nowIso = new Date().toISOString();

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          
          // Verify if login needs to be recorded (once per mount session)
          if (loginRecordedRef.current !== currentUser.uid) {
            loginRecordedRef.current = currentUser.uid;
            
            // Increment logins and update timestamp
            const updated: UserProfile = {
              ...data,
              totalLogins: (data.totalLogins || 0) + 1,
              lastLogin: nowIso
            };
            
            await setDoc(docRef, updated);
            setProfile(updated);
          } else {
            setProfile(data);
          }
        } else {
          // Create initial fallback profile if not present
          let nameVal = currentUser.displayName || currentUser.email?.split('@')[0] || 'Anggota LogJantung';
          if (currentUser.email === 'tamu.logjantung@gmail.com') {
            nameVal = 'Tamu Jantung';
          }
          const newProfile: UserProfile = {
            name: nameVal,
            gender: 'Laki-laki',
            weight: 70,
            height: 170,
            bmi: 24.2,
            bmiCategory: 'Normal',
            totalLogins: 1,
            lastLogin: nowIso
          };
          loginRecordedRef.current = currentUser.uid;
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, profilePath);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchOrCreateProfile();
  }, [currentUser]);

  // Listen to Blood Pressure Logs
  useEffect(() => {
    if (!currentUser) return;

    if (currentUser.uid === 'guest_tamu_jantung') {
      const localLogsStr = localStorage.getItem('guest_blood_pressures');
      if (localLogsStr) {
        setBloodPressureLogs(JSON.parse(localLogsStr));
      } else {
        const initialLogs: BloodPressureLog[] = [
          {
            id: 'seed-log-1',
            userId: currentUser.uid,
            systolic: 118,
            diastolic: 78,
            category: 'Normal',
            createdAt: new Date(Date.now() - 2 * 3600000).toISOString() as any
          },
          {
            id: 'seed-log-2',
            userId: currentUser.uid,
            systolic: 145,
            diastolic: 92,
            category: 'Hipertensi Derajat 1',
            createdAt: new Date(Date.now() - 26 * 3600000).toISOString() as any
          }
        ];
        localStorage.setItem('guest_blood_pressures', JSON.stringify(initialLogs));
        setBloodPressureLogs(initialLogs);
      }
      return;
    }

    const bpPath = 'bloodPressures';
    const q = query(
      collection(db, 'bloodPressures'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const logs: BloodPressureLog[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          logs.push({
            id: doc.id,
            userId: data.userId,
            systolic: data.systolic,
            diastolic: data.diastolic,
            category: data.category,
            createdAt: data.createdAt
          });
        });
        setBloodPressureLogs(logs);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, bpPath);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  // Handle Save Profile
  const handleSaveProfile = async (updated: UserProfile) => {
    if (!currentUser) return;
    setSavingProfile(true);

    if (currentUser.uid === 'guest_tamu_jantung') {
      localStorage.setItem('guest_profile', JSON.stringify(updated));
      setProfile(updated);
      setSavingProfile(false);
      return;
    }

    const profilePath = `profiles/${currentUser.uid}`;
    try {
      const docRef = doc(db, 'profiles', currentUser.uid);
      await setDoc(docRef, updated);
      setProfile(updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, profilePath);
    } finally {
      setSavingProfile(false);
    }
  };

  // Add Blood Pressure record
  const handleAddBPLog = async (sysName: number, diaName: number) => {
    if (!currentUser) return;
    setSavingTensi(true);

    // Categories formulas
    let classification: 'Hipertensi Derajat 3' | 'Hipertensi Derajat 2' | 'Hipertensi Derajat 1' | 'Sistolik Terisolasi' | 'Normal' = 'Normal';
    if (sysName >= 180 || diaName >= 110) {
      classification = 'Hipertensi Derajat 3';
    } else if ((sysName >= 160 && sysName <= 179) || (diaName >= 100 && diaName <= 109)) {
      classification = 'Hipertensi Derajat 2';
    } else if (sysName >= 140 && diaName < 90) {
      classification = 'Sistolik Terisolasi';
    } else if ((sysName >= 140 && sysName <= 159) || (diaName >= 90 && diaName <= 99)) {
      classification = 'Hipertensi Derajat 1';
    } else {
      classification = 'Normal';
    }

    if (currentUser.uid === 'guest_tamu_jantung') {
      const newLogItem: BloodPressureLog = {
        id: 'local_' + Math.random().toString(36).substring(2, 11),
        userId: currentUser.uid,
        systolic: sysName,
        diastolic: diaName,
        category: classification,
        createdAt: new Date().toISOString() as any
      };

      const localLogsStr = localStorage.getItem('guest_blood_pressures');
      const logsList: BloodPressureLog[] = localLogsStr ? JSON.parse(localLogsStr) : [];
      const updatedList = [newLogItem, ...logsList];
      localStorage.setItem('guest_blood_pressures', JSON.stringify(updatedList));
      setBloodPressureLogs(updatedList);
      setSavingTensi(false);
      return;
    }

    const bpPath = 'bloodPressures';
    try {
      await addDoc(collection(db, 'bloodPressures'), {
        userId: currentUser.uid,
        systolic: sysName,
        diastolic: diaName,
        category: classification,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, bpPath);
    } finally {
      setSavingTensi(false);
    }
  };

  // Delete Blood Pressure record
  const handleDeleteBPLog = async (logId: string) => {
    if (currentUser && currentUser.uid === 'guest_tamu_jantung') {
      const localLogsStr = localStorage.getItem('guest_blood_pressures');
      const logsList: BloodPressureLog[] = localLogsStr ? JSON.parse(localLogsStr) : [];
      const updatedList = logsList.filter(log => log.id !== logId);
      localStorage.setItem('guest_blood_pressures', JSON.stringify(updatedList));
      setBloodPressureLogs(updatedList);
      return;
    }

    const bpPath = `bloodPressures/${logId}`;
    try {
      await deleteDoc(doc(db, 'bloodPressures', logId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, bpPath);
    }
  };

  // Logout action
  const handleSignOut = async () => {
    try {
      if (currentUser && currentUser.uid === 'guest_tamu_jantung') {
        setCurrentUser(null);
        setProfile(null);
        setBloodPressureLogs([]);
        localStorage.removeItem('is_guest');
      } else {
        await signOut(auth);
        loginRecordedRef.current = null;
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 transition-colors duration-300">
        <div className="flex flex-col items-center space-y-4">
          <Heart className="h-16 w-16 text-emerald-600 fill-emerald-500/20 animate-pulse" />
          <h1 className="text-xl font-bold text-slate-900 font-sans">Menghubungkan ke LogJantung...</h1>
          <p className="text-xs font-semibold text-slate-500">Memuat status medis terenkripsi</p>
        </div>
      </div>
    );
  }

  // If not authenticated, force Auth screen
  if (!currentUser) {
    return <Auth onSuccess={(mockUser) => {
      if (mockUser) {
        setCurrentUser(mockUser);
        localStorage.setItem('is_guest', 'true');
      }
      setActiveTab('beranda');
    }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 flex flex-col pb-12">
      {/* Dynamic Header / Navigation Link bar */}
      <Navigation
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'dan_diet') {
            setActiveTab('edukasi');
            setEducationSubTab('diet');
          } else {
            setActiveTab(tab);
          }
        }}
        onLogout={handleSignOut}
        profileName={profile?.name || ''}
      />

      {/* Main Body container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Verification Alert if Tamu */}
        {(currentUser.isAnonymous || currentUser.email === 'tamu.logjantung@gmail.com') && activeTab === 'beranda' && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-6 text-xs flex items-start space-x-3 text-emerald-800">
            <Activity className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <span className="font-bold">Mode Tamu Aktif (Guest Mode)</span>
              <p className="leading-relaxed font-semibold">
                Anda masuk menggunakan akun Tamu. Untuk menyimpan dan mengamankan rekam medis tensi koroner Anda secara privat dan abadi, silakan keluar ke menu Login dan hubungkan akun menggunakan Google OAuth 2.0.
              </p>
            </div>
          </div>
        )}

        {/* Tab Routing Router */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            {activeTab === 'beranda' && (
              <LandingPage
                onGoToTensi={() => setActiveTab('tensi')}
                onGoToEdukasi={() => {
                  setActiveTab('edukasi');
                  setEducationSubTab('pjk');
                }}
                onGoToDiet={() => setActiveTab('panduan')}
                onGoToKuis={() => setActiveTab('kuis')}
                profileName={profile?.name || ''}
              />
            )}

            {activeTab === 'tensi' && (
              <BloodPressureTracker
                logs={bloodPressureLogs}
                onAddLog={handleAddBPLog}
                onDeleteLog={handleDeleteBPLog}
                saving={savingTensi}
              />
            )}

            {activeTab === 'edukasi' && (
              <Education initialSubTab={educationSubTab} />
            )}

            {activeTab === 'panduan' && (
              <DietGuide />
            )}

            {activeTab === 'kuis' && (
              <Quiz />
            )}

            {activeTab === 'profil' && (
              <ProfileForm
                initialProfile={profile}
                onSaveProfile={handleSaveProfile}
                saving={savingProfile}
              />
            )}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}
