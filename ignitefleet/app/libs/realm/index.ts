import { createRealmContext } from "@realm/react";
import { Historic } from "./schemas/Historic";
import { OpenRealmBehaviorType } from "realm";

const reamlAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: any = {
    flexible: true,
    newRealmFileBehavior: reamlAccessBehavior,
    existingRealmFileBehavior: reamlAccessBehavior,
}

export const {
    RealmProvider,
    useRealm,
    useQuery,
    useObject,
} = createRealmContext({
    schema: [Historic]
});
