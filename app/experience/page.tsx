import Link from 'next/link';
import { allExperiences } from 'contentlayer/generated';
import { Navigation } from '../components/nav';
import { Card } from '../components/card';
import { Article } from './article';
import { Eye } from 'lucide-react';
import RedisUtil from '@/util/redis';

import Image from 'next/image';

export const revalidate = 60;

export default async function ExperiencePage() {
  await RedisUtil.connect();
  const views: Record<string, number> = {};
  for (let p of allExperiences) {
    views[p.slug] =
      Number(
        RedisUtil.client
          ? await RedisUtil.client.get(`pageviews:experiences:${p.slug}`)
          : 0
      ) ?? 0;
  }

  const featured = allExperiences.find(
    (experience) => experience.slug === 'jio'
  )!;
  const top2 = allExperiences.find(
    (experience) => experience.slug === 'Persistent'
  )!;
  const top3 = allExperiences.find((experience) => experience.slug === 'Cncf')!;
  const sorted = allExperiences
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug
    )
    .sort(
      (a, b) =>
        new Date(b.startDate ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.startDate ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Experience
          </h2>
          <p className="mt-4 text-zinc-400">My experience over time.</p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <Link href={`/experience/${featured.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {featured.startDate ? (
                      <time
                        dateTime={new Date(featured.startDate).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: 'medium',
                        }).format(new Date(featured.startDate))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />{' '}
                    {Intl.NumberFormat('en-US', { notation: 'compact' }).format(
                      views[featured.slug] ?? 0
                    )}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                  {featured.location}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((experience) => (
              <Card key={experience.slug}>
                <Article
                  experience={experience}
                  views={views[experience.slug] ?? 0}
                />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((experience) => (
                <Card key={experience.slug}>
                  <Article
                    experience={experience}
                    views={views[experience.slug] ?? 0}
                  />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((experience) => (
                <Card key={experience.slug}>
                  <Article
                    experience={experience}
                    views={views[experience.slug] ?? 0}
                  />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((experience) => (
                <Card key={experience.slug}>
                  <Article
                    experience={experience}
                    views={views[experience.slug] ?? 0}
                  />
                </Card>
              ))}
          </div>
        </div>
        <div >
          <div className="flex justify-center max-w-3000">
            <Image className="mx-2" src="/c2.jpg" alt="Logo" width={1000} height={100} />
            {/* <Image className="mx-2" src="/c2.jpg" alt="Logo" width={1000} height={100} /> */}
            {/* here add multiple images below  */}
            {/* className="text-center bg-gradient-to-r from-cyan-500 to-blue-500" */}
            {/* <Image className="mx-2" src="/image2.jpg" alt="Logo" width={1000} height={0} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
