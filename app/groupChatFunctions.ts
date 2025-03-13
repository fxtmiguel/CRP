import { UUIDString } from '@/dataconnect-generated/js/default-connector';
import {supabase} from './SupabaseConfig';

async function createGroupChat(name: String, user_id: UUIDString) {
    const {data, error} = await supabase.rpc('creategroupchat', {
        param1: name,
        param2: user_id,
      });
}