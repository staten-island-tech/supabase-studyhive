import { supabase } from './supabase';

async function testSignup() {
    const { data, error } = await supabase.auth.signUp({
        email: 'elisachen230@gmail.com',
        password: 'example-password',
        options: {
            data: {
                username: 'hi',
                full_name: 'Elisa Chen',
                birthday: '01-02-2009'
            },
        },
    });

    if (error) {
        console.error('Sign up failed:', error.message);
    } else {
        console.log('Sign up succeeded! User ID:', data.user?.id);
    }
    console.log(data);
}

testSignup();