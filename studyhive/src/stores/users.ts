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

            async function getData(email: string, type: string) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select(type)       // to select all, do: .select
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
            if (getData(email, 'avatar_url') !== null) {
                pfp = getData(email, 'avatar_url') || '';
            }
            let birthday = '';
            if (getData(email, 'birthday') !== null) {
                birthday = getData(email, 'birthday') || '';
            }
            const user = {
                email: email,
                username: metadata.username,
                fullName: metadata.full_name,
                pfp: pfp,
                birthday: birthday
            }
            console.log(user);
            this.isSignedIn = true;
            this.userInfo = user;

        },
        async signUp(email: string, password: string, username: string, fullName: any, birthday: string) {
            const { data, error } = await supabase.auth.signUp(
                {
                    email: email,
                    password: password,
                    options: {
                        data: {
                            username: username,
                            full_name: fullName[0] + ' ' + fullName[1],
                            birthday: birthday
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
                pfp: 'https://i.pinimg.com/736x/53/57/61/53576100ffec1b41db0c013c46708cad.jpg',
                birthday: birthday
            }
            console.log(user);
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