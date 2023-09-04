// import React from 'react'
import { fetchUtils, Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import {createClient} from '@supabase/supabase-js'
import { PostList, PostEdit, PostCreate, PostIcon } from './posts.jsx';
// import corsHeaders from './headers.jsx'
const options = {
    db: {
        schema: 'posts',
    },
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    },
    global: {
        headers: {
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range': '0-24/319',
            'Content-Type': 'application/json'
        }

    }
}

const fetchJson = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    // options.headers.set('Access-Control-Expose-Headers', 'Content-Range', 'Content-Type', 'application/json');
    options.headers.set({
        'Access-Control-Expose-Headers': 'Content-Range',
        // 'Content-Range': '0-24/319',
        // 'Content-Type': 'application/json'
    });
    return fetchUtils.fetchJson(url, options);
}



const supabaseClient = createClient('https://eexzetlgmkwccaoihnoj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVleHpldGxnbWt3Y2Nhb2lobm9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzNzUyMjQsImV4cCI6MjAwODk1MTIyNH0.SKq8atlcPQsv92Jupi-bHf2waETy0uU31H2r0mblreY', options)
console.log(supabaseClient.from('posts').select('name'))
console.log(supabaseClient)

function App() {


  return (
    <Admin dataProvider={restProvider(supabaseClient)}>
      <Resource
          name="posts"
          list={PostList}
          edit={PostEdit}
          create={PostCreate}
          icon={PostIcon}/>
    </Admin>
  )
}

export default App
