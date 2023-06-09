import { SportyApi } from '../sporty-api.service'
import { User } from './interfaces/user.interface'
import {VenomConnect} from "venom-connect";
import {ProviderRpcClient} from "everscale-inpage-provider";
import {EverscaleStandaloneClient} from "everscale-standalone-client";

export class UserService {
    private readonly api = new SportyApi<User>()

    private readonly userObjectKey = 'SportyBeavers__user'

    private readonly emptyUser: User = {
        beav: 0,
        beavers: [],
        last_time_log_in: new Date(),
        user_id: '',
        wallet: '0x000',
        moral: 0,
    }


    async initVenomConnect(): Promise<VenomConnect> {
        return new VenomConnect({
            theme: 'venom',
            /* 1000 === Testnet */
            // checkNetworkId: 1000,
            /** 1002 === Devnet*/
            checkNetworkId: 1002,
            providersOptions: {
                venomwallet: {
                    links: {},
                    walletWaysToConnect: [
                        {
                            package: ProviderRpcClient,
                            packageOptions: {
                                fallback:
                                    VenomConnect.getPromise("venomwallet", "extension") ||
                                    (() => Promise.reject()),
                                forceUseFallback: true,
                            },
                            packageOptionsStandalone: {
                                fallback: () =>
                                    EverscaleStandaloneClient.create({
                                        connection: {
                                            id: 1000,
                                            group: 'venom_testnet',
                                            type: 'jrpc',
                                            data: {
                                                endpoint: 'https://jrpc-testnet.venom.foundation/rpc',
                                            },
                                        },
                                    }),
                                forceUseFallback: true,
                            },
                            id: "extension",
                            type: "extension",
                        },
                        {
                            package: ProviderRpcClient,
                            packageOptions: {
                                fallback:
                                    VenomConnect.getPromise("venomwallet", "mobile") ||
                                    (() => Promise.reject()),
                                forceUseFallback: true,
                            },
                            packageOptionsStandalone: {
                                fallback: () =>
                                    EverscaleStandaloneClient.create({
                                        connection: {
                                            id: 1000,
                                            group: 'venom_testnet',
                                            type: 'jrpc',
                                            data: {
                                                endpoint: 'https://jrpc-testnet.venom.foundation/rpc',
                                            },
                                        },
                                    }),
                                forceUseFallback: true,
                            },
                            id: "mobile",
                            type: "mobile",
                            options: {
                                devices: []
                            }
                        }
                    ],
                    defaultWalletWaysToConnect: [
                        'mobile',
                        'ios',
                        'android',
                    ],
                },
            },
        });
    }

    async findByWallet(wallet: string): Promise<User> {
        const user = await this.api.request({
            method: 'GET',
            path: 'user/' + wallet,
        })
        this.setInLocalStorage(user)
        return user
    }

    getFromLocalStorage(): User {
        const userJsonString = localStorage.getItem(this.userObjectKey)
        return userJsonString ? JSON.parse(userJsonString) : this.emptyUser
    }

    setInLocalStorage(user: User): void {
        localStorage.setItem(this.userObjectKey, JSON.stringify(user))
    }

    async refreshUser(): Promise<void> {
        const user = this.getFromLocalStorage()
        await this.findByWallet(user.wallet)
    }
}