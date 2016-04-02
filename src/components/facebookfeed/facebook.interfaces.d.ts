declare namespace Facebook {
    export interface IPost {
        id: string;
        admin_creator: {
            id: string,
            link: string
        };
        application: any; // app type
        call_to_action: {
            context: any
        };
        caption: string;
        created_time: Date;
        description: string;
        feed_targeting: {
            age_max: number,
            age_min: number,
            cities: number[],
            college_years: number[],
            countries: string[],
            edication_statuses: number[],
            genders: number[],
            interested_in: number[],
            locales: number[],
            regions: number[],
            relationship_statuses: number[]
        };
        from: IProfile;
        icon: string;
        is_hidden: boolean;
        is_published: boolean;
        likes: ILikes;
        link: string;
        message: string;
        message_tags: any;
        name: string;
        object_id: string;
        picture: string;
        place: IPlace;
        privacy: {
            description: string,
            value: PrivacyValue,
            friends: PrivacyFriends,
            allow: any,
            deny: any
        };
        properties: {
            name: string,
            text: string,
            href: string
        }[];
        shares: {};
        source: string;
        status_type: StatusType;
        story: string;
        story_tags: {};
        targeting: {
            countries: string[],
            locales: number[],
            regions: any,
            cities: any
        };
        // to: IProfile[];
        type: PostType;
        updated_time: Date;
        with_tags: any;
    }

    export interface ILikes {
        data: {
            id: string;
        }[];
        summary: {
            can_like: boolean,
            has_liked: boolean,
            total_count: number
        };
    }

    export interface IProfile {
        id: string;
        name: string;
        category: string;
    }

    export interface IPlace {
        id: string;
        name: string;
        location: {
            latitude: number,
            longitude: number
        };
    }

    export enum StatusType {
        'mobile_status_update',
        'created_note',
        'added_photos',
        'added_video',
        'shared_story',
        'created_group',
        'created_event',
        'wall_post',
        'app_created_story',
        'published_story',
        'tagged_in_photo',
        'approved_friend'
    }

    export enum PostType {
        'link',
        'status',
        'photo',
        'video',
        'offer'
    }

    export enum PrivacyValue {
        'EVERYONE',
        'ALL_FRIENDS',
        'SELF',
        'CUSTOM'
    }

    export enum PrivacyFriends {
        'ALL_FRIENDS',
        'FRIENDS_OF_FRIENDS',
        'SOME_FRIENDS'
    }

    export interface IFacebookApiValue<T> {
        config: any;
        data: {
            data: T[],
            paging: any
        };
        status: number;
        statusText: string;
    }
}
