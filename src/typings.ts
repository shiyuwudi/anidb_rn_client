//  {"result": {"anime": 12637, "created": "Wed Jul  8 03:00:05 2020", "titles": 66740}}
export interface AnimeListMetadata extends AnidbResult<{
    anime: number;
    created: string;
    titles: number;
}> {}

export interface AnidbResult<T> {
    result: T;
}

export interface AnimeInfo {
    aid: number;
    titles: {
        lang: string;
        type: string;
        title: string;
    }[]
}

export interface AnimeList extends AnidbResult<AnimeInfo[]> {}