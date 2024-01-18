import { Express } from 'express';
import {initializeApp} from 'firebase/app';
import {getStorage, ref, getDownloadURL, uploadBytesReumable} from "firebase/storage";
import multer from 'multer';
import config from "webpack.config.js"
