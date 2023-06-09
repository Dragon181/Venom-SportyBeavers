import { IPreviewImages } from '../../../../pages/configurator/beaver-config.interface'

export interface ICreateBeaver {
    readonly owner_user_id: string
    readonly config: IPreviewImages
}