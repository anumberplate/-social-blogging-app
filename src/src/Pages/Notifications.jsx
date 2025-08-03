const notifications = [
  {
    img: "nature.jpg",
    message: "You have missed four new articles on nature topic",
    dismissable: false,
  },
  {
    img: "topstories.jpg",
    message: "Don’t miss the latest inspiring story coming this weekend",
    dismissable: false,
  },
  {
    img: "followers.png",
    message: "Two people want to follow you",
    dismissable: true,
  },
  {
    img: "adventure.jpg",
    message: "You have missed four new articles on adventure topic",
    dismissable: false,
  },
];

export default function Notifications() {
  return (
    <section className="max-w-md mx-auto p-4 bg-white">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-bold text-xl">Notifications</h2>
        <a href="#" className="text-sm text-blue-600 underline">
          Don’t miss out on any news.
        </a>
        <div className="text-2xl mt-2">🔔</div>
      </div>

      {/* Notification Cards */}
      <ul className="space-y-4">
        {notifications.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white shadow-sm border rounded-md p-2"
          >
            {/* Left image or icon */}
            <img
              src={item.img}
              alt=""
              className="w-16 h-16 object-cover rounded"
            />

            {/* Message */}
            <p className="text-sm flex-1 px-4">{item.message}</p>

            {/* Dismiss button */}
            {item.dismissable && (
              <button className="text-red-600 font-bold text-2xl bg-blue-100 px-2 py-1 rounded hover:bg-blue-200">
                ✕
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
