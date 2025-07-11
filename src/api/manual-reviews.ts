import type { NextApiRequest, NextApiResponse } from 'next';

const reviews = [
  {
    author_name: "Alice Johnson",
    rating: 5,
    text: "Amazing work! My website looks fantastic.",
    relative_time_description: "2 weeks ago"
  },
  {
    author_name: "Bob Smith",
    rating: 4,
    text: "Very professional and timely delivery.",
    relative_time_description: "1 month ago"
  },
  {
    author_name: "Carla Davis",
    rating: 5,
    text: "Exceeded expectations. Will hire again.",
    relative_time_description: "3 months ago"
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(reviews);
}