import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: 'adminApi',
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `users/user/${id}`,
            providesTags: ['User']
        }),
        getUsers: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: 'users/get_users',
                method: 'GET',
                params: {page, pageSize, sort, search},
            }),
            providesTags: ['User']
        }),
        getAttendee: build.query({
            query: (id) => `attendees/attendee/${id}`,
            providesTags: ['Attendee']
        }),
        getAttendees: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: 'attendees/get_attendees',
                method: 'GET',
                params: {page, pageSize, sort, search},
            }),
            providesTags: ['Attendee']
        }),
        getSpeech: build.query({
            query: (id) => `speeches/speech/${id}`,
            providesTags: ['Speech']
        }),
        getSpeeches: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: 'speeches/get_speeches',
                method: 'GET',
                params: {page, pageSize, sort, search},
            }),
            providesTags: ['Speech']
        }),
        updateSpeech: build.mutation({
            query: ({ id, topic, timeSlot }) => ({
              url: `speeches/speech/update/${id}`,
              method: 'PUT',
              body: { topic, timeSlot },
            }),
            providesTags: ['Speech']
          }),
    })
})

export const {
    useGetUserQuery,
    useGetUsersQuery,
    useGetAttendeeQuery,
    useGetAttendeesQuery,
    useGetSpeechQuery,
    useGetSpeechesQuery,
    useUpdateSpeechMutation,
} = api;