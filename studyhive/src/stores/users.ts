import { defineStore } from "pinia";

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
        signIn(userData: UserInfo) {
            this.isSignedIn = true;
            this.userInfo = userData;
        },
        signOut() {
            this.isSignedIn = false;
            this.userInfo = null;
        }
    }
})