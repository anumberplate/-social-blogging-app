import React from "react"
const followers = [
  { name: "Vicky Lyn", img: "vicky.jpg", followBack: false },
  { name: "Hufa Ann", img: "hufa.jpg", followBack: true },
  { name: "Briah Nale", img: "briah.jpg", followBack: false },
  { name: "Sydney Olive", img: "sydney.jpg", followBack: true },
  { name: "Denis Olin", img: "denis.jpg", followBack: false },
  { name: "Nancy Meng", img: "nancy.jpg", followBack: false },
];

export default function FollowersList() {
  return (
    <section className="max-w-md mx-auto p-4 mt-36 pt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Followers</h2>
        <div className="flex gap-12 text-sm font-semibold text-gray-600">
          <span>REMOVE</span>
          <span>FOLLOW BACK</span>
        </div>
      </div>

      <ul className="space-y-4">
        {followers.map((follower, idx) => (
          <li key={idx} className="flex py-4 items-center justify-between">
            {/* Left: Profile Info */}
            <div className="flex items-center gap-4">
              <img
                src={follower.img}
                alt={follower.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-medium">{follower.name}</span>
            </div>

            {/* Right: Remove + Follow back */}
            <div className="flex items-center gap-6">
              <button className="text-red-600 text-2xl font-bold hover:scale-110 transition">
                ✕
              </button>
              {follower.followBack && (
                <button className="text-black-600 font-semibold text-sm hover:underline">
                  FOLLOW
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
