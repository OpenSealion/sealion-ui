export interface LocaleProps {
    locale: string,
    pagination?: {
        jump_prev_five?: string,
        jump_next_five?: string,
        jump_to?: string,
        page?: string
    }
}
