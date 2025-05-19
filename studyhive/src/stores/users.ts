import { defineStore } from "pinia";
import { supabase } from "@/supabase.ts";

interface UserInfo {
    email: string,
    username: string,
    fullName: string,
    pfp: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        isSignedIn: false,
        userInfo: null as UserInfo | null
    }),
    actions: {
        async signIn(email: string, password: string) {
            const { data, error } = await supabase.auth.signInWithPassword(
                {
                    email: email,
                    password: password
                }
            )
            if (error) {
                alert("ERROR");       //add more to it
                return null;
            }
            async function getAuthData() {
                const {
                    data: { user }
                } = await supabase.auth.getUser();
                const metadata = user?.user_metadata;
                return metadata;
            }

            async function getPfp(email: string) {
                const { data, error } = await supabase
                    .from('characters')
                    .select('avatar_url')
                    .eq('email', email)
                if (error) {
                    alert("ERROR");       //add more to it
                    return 'null';
                }
                return data.toString;
            }
            let metadata = await getAuthData();
            if (metadata === undefined) {
                metadata = { username: '', full_name: '' };
            }
            let pfp = '';
            if (getPfp(email) !== null) {
                pfp = getPfp(email) || '';
            }
            const user = {
                email: email,
                username: metadata.username,
                fullName: metadata.full_name,
                pfp: pfp
            }
            this.isSignedIn = true;
            this.userInfo = user;

        },
        async signUp(email: string, password: string, username: string, fullName: any) {
            const { data, error } = await supabase.auth.signUp(
                {
                    email: email,
                    password: password,
                    options: {
                        data: {
                            username: username,
                            full_name: fullName[0] + ' ' + fullName[1]
                        }
                    }
                });
            if (error) {      //change later - ADD stuff to show it instead of just on console!!!!
                if (error.message.includes('user already registered')) {
                    alert('Email is already in use.');
                    return null;
                } else {
                    alert(`Sign-up error: ${error.message}`);
                    return null;
                }
            }
            const user = {
                email: email,
                username: username,
                fullName: fullName[0] + ' ' + fullName[1],
                pfp: 'https://i.pinimg.com/736x/53/57/61/53576100ffec1b41db0c013c46708cad.jpg'
            }
            this.isSignedIn = true;
            this.userInfo = user;
        },
        async signOut() {
            this.isSignedIn = false;
            this.userInfo = null;
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.log(error);
            }
        }
    }
})