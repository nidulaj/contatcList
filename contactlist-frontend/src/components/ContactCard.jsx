export default function ContactCard(props,) {
  return (
    <div
  onClick={props.onClick}
  className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
>
  <img
    src={props.isDark ? "/src/assets/user-dark.png" : "/src/assets/user-light.png"}
    alt="User"
    className="w-10 h-10 rounded-full object-cover"
  />

  <div className="flex flex-col">
    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
      {props.firstName} {props.lastName}
    </h3>
    <p className="text-xs text-gray-600 dark:text-gray-400">{props.phoneNumber}</p>
  </div>
</div>

  );
}
