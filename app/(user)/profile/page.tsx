'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [session, setSession] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('m')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session)
      if (!session) {
        router.push('/auth')
      } else {
        // Hydrate from user_metadata first if present
        const meta = session.user.user_metadata
        if (meta) {
          if (meta.phone) setPhone(meta.phone)
          if (meta.dob) setDob(meta.dob)
          if (meta.gender) setGender(meta.gender)
          if (meta.address) setAddress(meta.address)
        }
        fetchProfile(session.user.id)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session)
      if (!session) {
        router.push('/auth')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const fetchProfile = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', uid)
        .single()
      
      if (error && error.code !== 'PGRST116') throw error // PGRST116 is no rows
      if (data) setFullName(data.full_name || '')
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    if (!session?.user) return
    try {
      setLoading(true)
      
      // Update custom table
      const { error: dbError } = await supabase.from('profiles').upsert({
        id: session.user.id,
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
      if (dbError) throw dbError

      // Update auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { phone, dob, gender, address }
      })
      if (authError) throw authError

      alert('Profile updated successfully!')
    } catch (error: any) {
      alert('Error updating profile: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (loading && !session) return <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>

  return (
    <div style={{ maxWidth: '500px', margin: '100px auto', padding: '30px', background: 'white', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
      <h2 style={{ fontSize: '28px', color: '#1A3636', marginBottom: '8px' }}>Your Profile</h2>
      <p style={{ color: '#666', marginBottom: '30px', fontSize: '14px' }}>Logged in as: <strong>{session?.user?.email}</strong></p>
      
      <div style={{ marginBottom: '14px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Full Name</label>
        <input 
          type="text" 
          placeholder="e.g. Akshay Yadav"
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px' }}
        />
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Phone Number</label>
        <input 
          type="tel" 
          placeholder="+91 9876543210"
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Date of Birth</label>
          <input 
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Gender</label>
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px', background: 'white' }}
          >
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Address</label>
        <textarea 
          placeholder="Full delivery address, landmarks, and pincode"
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px', minHeight: '80px', fontFamily: 'inherit' }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          onClick={updateProfile} 
          disabled={loading}
          style={{ flex: 1, padding: '14px', background: '#D4860A', color: 'white', borderRadius: '50px', fontSize: '15px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', border: 'none' }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button 
          onClick={signOut}
          style={{ padding: '14px 24px', background: '#F8F7F4', color: '#1A3636', borderRadius: '50px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', border: '1.5px solid #eaeaea' }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
