'use client'
import Image from "next/image";
import Link from "next/link";

interface Props {
  postData: PostType;
}

const BlogCard = ({ postData }: Props) => {
  return (
    <Link href={`blog/${postData.slug}`}>
      <div className="flex flex-col h-full shadow-md rounded overflow-hidden hover:scale-[1.02] transition-transform duration-300 bg-white">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={postData?.imageUrl}
            alt="forest with sunlight"
            width={400}
            height={500}
            className="object-cover"
          />
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
            {postData?.categories?.map((category, idx) => (
              <span
                key={idx}
                className=" bg-black/70 text-white text-xs px-3 py-1 rounded-tl-full rounded-br-full uppercase"
              >
                {category?.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col px-4 py-4 grow">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {postData?.title}
          </h2>
          <p className="text-xs text-gray-400 mt-1 mb-2">
            {postData?.author.name}, {(postData?.publishedAt).substring(0, 10)}
          </p>
          <p className="text-sm text-gray-600 line-clamp-3">
            {postData?.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
