import { PUBLIC_API_PB } from '$env/static/public'
import PocketBase from 'pocketbase'

export const pb = new PocketBase(PUBLIC_API_PB)