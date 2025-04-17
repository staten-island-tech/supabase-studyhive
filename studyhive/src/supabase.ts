import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://baoafwwjrcrstirukkkb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhb2Fmd3dqcmNyc3RpcnVra2tiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTU5NjcsImV4cCI6MjA1OTI3MTk2N30.W1JG44azGV5d7R6wd3GCGEr8UEQZe9SoBRfcu4klWEA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const { data, error } = await supabase.auth.signUp({
    email: 'elisa@example.com',
    password: 'supasecret123',
});


