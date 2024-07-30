export declare class CreateEventDto {
    readonly event_name: string;
    readonly description: string;
    readonly image: string;
    readonly date_due: Date;
    readonly cost: number;
    readonly place: string;
    readonly type_event_id: string;
}
export declare class EventResponseDto {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly date: Date;
    readonly typeEventId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
