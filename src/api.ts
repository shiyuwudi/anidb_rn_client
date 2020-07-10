import {AnimeListMetadata, AnimeList} from "./typings";


export const anidb = {
    get: function (suffix:string): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`http://192.168.15.204:3000/${suffix}`)
                .then((response) => response.json())
                .then(json => resolve(json))
                .catch(err => reject(err));
        });
    },
    listMetadata: async function(): Promise<AnimeListMetadata> {
        return await this.get("list-metadata");
    },
    list: async function(): Promise<AnimeList> {
        return await this.get("list");
    },
};