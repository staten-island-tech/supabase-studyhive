import { defineStore } from "pinia";
import { supabase } from "@/supabase.ts";

interface UserInfo {
    email: string,
    username: string,
    fullName: string,
    pfp: string,
    birthday: string,
    createdQuiz: object,
    favoritedQuiz: object
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
            async function getData(email: string) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select()       // to select all, do: .select       to select some do: .select(column title)
                    .filter('email', 'in', email)
                if (error) {
                    alert("ERROR");       //add more to it
                    return 'null';
                }
                console.log(data);
                return data;
            }
            console.log(data);
            const user = {
                email: email,
                username: data.user.user_metadata.username,
                fullName: data.user.user_metadata.full_name,
                pfp: data.user.user_metadata.pfp,
                birthday: data.user.user_metadata.birthday,
                createdQuiz: getData(email).created_quizzes,
                favoritedQuiz: getData(email).favorited_quizzes
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
                            birthday: birthday,
                            pfp: 'https://i.pinimg.com/736x/53/57/61/53576100ffec1b41db0c013c46708cad.jpg'
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
            console.log(data);
            const user = {
                email: email,
                username: username,
                fullName: fullName[0] + ' ' + fullName[1],
                pfp: 'https://i.pinimg.com/736x/53/57/61/53576100ffec1b41db0c013c46708cad.jpg',
                birthday: birthday,
                createdQuiz: {},
                favoritedQuiz: {}
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