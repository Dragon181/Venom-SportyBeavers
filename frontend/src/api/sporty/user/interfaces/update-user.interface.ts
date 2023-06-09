export interface IUpdateUserDto {
    readonly birthday_date: string
    readonly city_id: number
    readonly city_title: string
    readonly country_id: number
    readonly country_title: string
    readonly photo_url: string
    readonly sex: boolean
    readonly timezone: string
    readonly language: string
    readonly first_name: string
    readonly last_name: string
    readonly is_closed: boolean
    readonly wallet: string
    readonly will: number
    readonly last_time_log_in: string
    readonly steps: number
    readonly beav: number
}