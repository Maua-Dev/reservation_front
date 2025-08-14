import { RulesWarningCard } from '../components/rules-warning-card'
// import { RulesWarningCard } from

export default function RulesWarnings() {
  return (
    <div className="bg-red-30 flex h-[100vh] w-full flex-col items-center justify-start pt-20">
      {/* <p className="text-4xl">Rules and warnings here</p> */}
      <div className="flex h-[80px] w-[900px] items-center justify-center bg-blue-primary text-center text-4xl text-white">
        <p>Avisos e Regras</p>
      </div>
      <div className="flex h-[10px] w-full items-start justify-between px-[40rem] pl-20 pt-12 text-2xl text-blue-700">
        <div>
          <p>Avisos</p>
        </div>
        <div>
          <p>Regras</p>
        </div>
      </div>
      <div className="flex h-[370px] w-full flex-col items-end justify-between pr-52 pt-12">
        <div>
          <RulesWarningCard content=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " />
        </div>
      </div>
    </div>
  )
}
