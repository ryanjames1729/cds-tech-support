import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/ArticleList.module.css'

import { GraphQLClient } from 'graphql-request'

//comment
export const getStaticProps = async (context) => {
    const graphcms = new GraphQLClient(process.env.GRAPH_CMS_ENDPOINT)

    const { articles } = await graphcms.request(`
    {
        articles {
            id
            title
            slug
            targetAudience
            coverImage {
              id
              url
            }
            readTime
            body {
              text
            }
          }
    }
    `)

    return {
        props: {
            articles,
        },
        revalidate: 60,
    }
}


export default function Teacher( {articles} ) {
  return (
    <div className="flex">
        <aside className="w-64 fixed left-0 top-0 h-screen p-6 pt-10 border-r-2 border-slate-800 hidden md:block">
            <h1 className="text-3xl font-bold">Tech Support</h1>
            <div className="pt-1 pb-1">
            <p>Teachers, welcome to tech support from CDS.</p>
            </div>
            <div className="pt-2 pb-1">
                <p>Your Techonology Support is Amy Townsend and Ryan James</p>
            </div>
            <div className="pt-2 pb-1">
                <p>You can always ask questions and raise issues by contacting your Techonology
                    support team via email at <Link href='mailto:support@carolinaday.org'><a className="hover:text-blue-500 hover:underline">support@carolinaday.org</a></Link>
                </p>
            </div>
            

        </aside>
        <main class="flex-1 md:ml-64">
            <div class="p-10 h-screen">
                <h1 class="text-4xl">Support Articles</h1>
                {articles.map(article => (
                    <div className="p-2">
                    <Link href="/[targetAudience]/[slug]" as={`/${article.targetAudience}/${article.slug}`}>
                        <a>
                        <div class="grid grid-cols-2 md:grid-cols-6 border-solid hover:border-red-500 hover:shadow-sm border-2 rounded">
                            <div class="w-16 md:w-36">
                                <Image src={article.coverImage.url} height={130} width={130} layout="responsive" className="" alt={`${article.slug}`}/>  
                            </div>
                            <div className="md:hidden w-60 -ml-20">
                                <h2 class="text-2xl">{article.title}</h2>
                            </div>
                            <div class="col-span-5 pl-2">
                            <div class="grid grid-row-2">   
                                <h2 class="hidden md:block md:text-2xl">{article.title}</h2>
                                <p>{article.body.text.slice(0,250)}...</p>
                            </div> 
                            </div>
                        </div>
                        </a>
                    </Link>
                    </div>
                ))}
            </div>

            <div className="block md:hidden">
        <h1 className="text-3xl font-bold">Tech Support</h1>
            <div className="pt-1 pb-1">
            <p>Teachers, welcome to tech support from CDS.</p>
            </div>
            <div className="pt-2 pb-1">
                <p>Your Techonology Support is Amy Townsend and Ryan James</p>
            </div>
            <div className="pt-2 pb-1">
                <p>You can always ask questions and raise issues by contacting your Techonology
                    support team via email at <Link href='mailto:support@carolinaday.org'><a className="hover:text-blue-500 hover:underline">support@carolinaday.org</a></Link>
                </p>
            </div>
        </div>
        </main>

        
    </div>
  )
}