'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('m')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              address,
              dob,
              phone,
              gender
            }
          }
        })
        if (error) throw error
        setMsg('Success! You can now log in.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        })
        if (error) throw error
        router.push('/profile')
      }
    } catch (error: any) {
      setMsg(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', background: 'white', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
      <h2 style={{ fontSize: '28px', color: '#1A3636', marginBottom: '24px', textAlign: 'center' }}>
        {isSignUp ? 'Create an Account' : 'Welcome Back'}
      </h2>
      
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Email</label>
          <input 
            type="email" 
            placeholder="you@example.com" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px' }}
          />
        </div>

        {isSignUp && (
          <>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Phone</label>
              <input 
                type="tel" 
                placeholder="+91 9876543210" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                required={isSignUp}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Date of Birth</label>
              <input 
                type="date" 
                value={dob} 
                onChange={e => setDob(e.target.value)} 
                required={isSignUp}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Gender</label>
              <select 
                value={gender} 
                onChange={e => setGender(e.target.value)} 
                required={isSignUp}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px', background: 'white', WebkitAppearance: 'none' }}
              >
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>Address</label>
              <textarea 
                placeholder="Full Address, Pincode" 
                value={address} 
                onChange={e => setAddress(e.target.value)} 
                required={isSignUp}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #eaeaea', fontSize: '15px', minHeight: '80px', fontFamily: 'inherit' }}
              />
            </div>
          </>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '14px', background: '#D4860A', color: 'white', borderRadius: '50px', fontSize: '15px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', marginTop: '10px' }}
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button 
          onClick={() => { setIsSignUp(!isSignUp); setMsg(''); }}
          style={{ background: 'transparent', border: 'none', color: '#1A3636', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </div>
      
      {msg && (
        <div style={{ marginTop: '20px', padding: '12px', background: msg.includes('Success') ? '#E8F5E9' : '#FFEBEE', color: msg.includes('Success') ? '#2E7D32' : '#C62828', borderRadius: '8px', textAlign: 'center', fontSize: '14px' }}>
          {msg}
        </div>
      )}
    </div>
  )
}
