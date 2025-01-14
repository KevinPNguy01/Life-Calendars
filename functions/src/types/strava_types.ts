export type StravaActivity = {
    distance: number
    start_date_local: string
    id: number
    last_modified: Date
    type: string
}

export type AuthResponse = {
    access_token: string
    athlete: {
        id: number
        firstname: string
        lastname: string
        username: string
    }
    expires_at: number
    refresh_token: string
}