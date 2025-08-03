const followers = [
  { name: "Vicky Lyn", img: "vicky.jpg" },
  { name: "Hufa Ann", img: "hufa.jpg"},
  { name: "Briah Nale", img: "briah.jpg" },
  { name: "Sydney Olive", img: "sydney.jpg"},
  { name: "Denis Olin", img: "denis.jpg" },
  { name: "Nancy Meng", img: "nancy.jpg" },
];

export default function FollowingList() {
  return (
    <section className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Followers</h2>
        <div className="flex gap-12 text-sm font-semibold text-gray-600">
          <span>REMOVE</span>
        </div>
      </div>

      <ul className="space-y-4">
        {followers.map((follower, idx) => (
          <li key={idx} className="flex items-center justify-between">
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
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
