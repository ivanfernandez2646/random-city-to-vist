import { City } from '../types/City';
import { Community } from '../types/Community';
import { Province } from '../types/Province';

export class GeoApi {
    private static readonly URL = "https://apiv1.geoapi.es";
    private static readonly KEY = "fd4f606a57a1b03d015b873eb065b00077e7597a6a2a42b6d1d4353f6339405b";

    static async getCommunities(): Promise<Community[]> {
        return fetch(
            `${GeoApi.URL}/comunidades?key=${GeoApi.KEY}&type=JSON&sandbox=0`
        )
            .then((res) => res.json())
            .then(({ data }: { data: { CCOM: string; COM: string }[] }) => {
                return data.map((community) => {
                    return { code: community.CCOM, name: community.COM };
                }) as Community[];
            });
    }

    static async getProvincesByCommunity(community: Community): Promise<Province[]> {
        return fetch(
            `${GeoApi.URL}/provincias?CCOM=${community.code}&key=${GeoApi.KEY}&type=JSON&sandbox=0`
        )
            .then((res) => res.json())
            .then(({ data }: { data: { CCOM: string; CPRO: string, PRO: string }[] }) => {
                return data.map((province) => {
                    return { communityCode: province.CCOM, code: province.CPRO, name: province.PRO };
                }) as Province[];
            });
    }

    static async getRandomCityByProvince(province: Province): Promise<City> {
        return fetch(
            `${GeoApi.URL}/municipios?CPRO=${province.code}&key=${GeoApi.KEY}&type=JSON&sandbox=0`
        )
            .then((res) => res.json())
            .then(({ data }: { data: { CPRO: string; CMUM: string, DMUN50: string }[] }) => {
                const randomCity = data[Math.floor(Math.random() * data.length)]
                return { provinceCode: randomCity.CPRO, code: randomCity.CMUM, name: randomCity.DMUN50 } as City;
            });
    }
}