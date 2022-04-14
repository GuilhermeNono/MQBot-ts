import mongoose from 'mongoose'

export interface InsigniaInfo {
  insigniaID?: number;
  insigniaName?: string;
  insigniaURL?: string;
  insigniaDescription?: string;
  insigniaBoost?: number;
  insigniaRarity?: number | string;
}
