import { useState, useEffect } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { UserRole, UserProfile } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          // Defer to avoid potential deadlocks; then fetch profile
          setTimeout(() => {
            fetchProfile(session.user!.id)
          }, 0)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

      if (error) throw error

      if (!data) {
        // Lazily create a profile if it doesn't exist
        const { data: userResp } = await supabase.auth.getUser()
        const email = userResp.user?.email ?? null

        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            user_id: userId,
            email,
            first_name: '',
            last_name: '',
            role: 'customer',
          })

        if (insertError) throw insertError

        const { data: created } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle()

        setProfile(created as UserProfile)
      } else {
        setProfile(data as UserProfile)
      }
    } catch (error) {
      console.error('Error fetching/creating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData: {
    firstName: string
    lastName: string
    role: UserRole
  }) => {
    try {
      setLoading(true)
      
      const redirectUrl = `${window.location.origin}/`
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
          }
        }
      })

      if (error) throw error

      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
      })

      return { data, error: null }
    } catch (error) {
      const authError = error as AuthError
      toast({
        title: "Sign up failed",
        description: authError.message,
        variant: "destructive",
      })
      return { data: null, error: authError }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      })

      return { data, error: null }
    } catch (error) {
      const authError = error as AuthError
      toast({
        title: "Sign in failed",
        description: authError.message,
        variant: "destructive",
      })
      return { data: null, error: authError }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: "Signed out successfully",
        description: "See you next time!",
      })
    } catch (error) {
      const authError = error as AuthError
      toast({
        title: "Sign out failed",
        description: authError.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
    isCustomer: profile?.role === 'customer',
    isTrade: profile?.role === 'trade'
  }
}