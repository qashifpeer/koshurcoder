import { Rule, useInitialValue } from "sanity";

export default{
    name: 'post',
    type: 'document',
    title: 'Post',
    fields : [
        {
            name: 'title',
            title: 'Title',
            type:'string',
            validation: (Rule: Rule) =>  Rule.required().error('This field is required')
        },
        {
            name : 'slug',
            title : 'Slug',
            type : 'slug',
            options : {
                source : 'title',
                maxLength : 96,
            }
        },
        {
            name : "author",
            title : "Author",
            type : "reference",
            to: {type : "author" }
        },
        {
            name : "featureImage",
            title : "Feature Image",
            type : "image",
            options : {
                hotspot : true,
            },
            fields: [{
                type: 'string',
                name: 'alt',
                title: 'Alt',
            }]
        },
        {
            name : "categories",
            title : "Categories",
            type : "array",
            of : [{type : 'reference', to: {type: 'category'}}]
        },
        // {
        //     name : "tags",
        //     title : "Tags",
        //     type : "array",
        //     of : [{type : 'reference', to: {type: 'tag'}}]
        // },
        
        {
            name : 'shortDescription',
            title : 'Short Description',
            type : "text",
        },
        {
            name: "publishedAt",
            title: 'Published at',
            type: 'datetime',
            initialValue : () => new Date().toISOString(),
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }
    ],
    // preview: {
    //         select :{
    //             title : 'title',
    //             author : 'author.name',
    //             media : 'featureImage',
    //             publishedAt : 'publishedAt(formatString: "MMMM Do, YYYY")',
    //         },
           
    // }
}