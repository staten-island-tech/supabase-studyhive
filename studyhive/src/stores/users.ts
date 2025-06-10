import { defineStore } from "pinia";
import { supabase } from "@/supabase.ts";

interface UserInfo {
    email: string,
    username: string,
    fullName: string,
    pfp: string,
    birthday: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        isSignedIn: true, //change this to false later
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
            const user = {
                email: email,
                username: data.user.user_metadata.username,
                fullName: data.user.user_metadata.full_name,
                pfp: data.user.user_metadata.avatar_url,
                birthday: data.user.user_metadata.birthday
            }
            this.isSignedIn = true;
            this.userInfo = user;
        },
        async signUp(email: string, password: string, username: string, fullName: any, birthday: string) {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username,
                        full_name: fullName[0] + ' ' + fullName[1],
                        birthday: birthday,
                        avatar_url: 'https://i.pinimg.com/736x/53/57/61/53576100ffec1b41db0c013c46708cad.jpg'
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