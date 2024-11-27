// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL-c5_NFXx-BltbzDSoWpuSCgChmqJBlc",
  authDomain: "whatsappclone-de297.firebaseapp.com",
  databaseURL: "https://whatsappclone-de297-default-rtdb.firebaseio.com",
  projectId: "whatsappclone-de297",
  storageBucket: "whatsappclone-de297.firebasestorage.app",
  messagingSenderId: "424869572034",
  appId: "1:424869572034:web:4a8f92a10bc255d09aba5b",
  measurementId: "G-EQQS33KTY8",
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);

export default firebase;

//5Ftklvuv9GR9Zx4Csqdqs9787 subabase

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fyzftnrrpiljkbclsylf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5emZ0bnJycGlsamtiY2xzeWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MDgwMDEsImV4cCI6MjA0ODI4NDAwMX0.vsnVMC0kf8CB71mkma2JJwuaDGgFbsVcleccX0lRIUo";
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };
