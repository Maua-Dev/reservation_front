export function Form() {
  return (
    <form className="flex flex-col items-center justify-center gap-4 bg-white p-4">
      <h1 className="text-2xl font-bold">Reserve</h1>
      <input
        type="text"
        placeholder="Name"
        className="w-full rounded-lg border border-gray-300 p-2"
      />
      <input
        type="text"
        placeholder="Email"
        className="w-full rounded-lg border border-gray-300 p-2"
      />
      <input
        type="text"
        placeholder="Date"
        className="w-full rounded-lg border border-gray-300 p-2"
      />
      <input
        type="text"
        placeholder="Time"
        className="w-full rounded-lg border border-gray-300 p-2"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-500 p-2 text-white"
      >
        Submit
      </button>
    </form>
  )
}
