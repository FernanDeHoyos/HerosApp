interface props {
    Title: String,
    Description: String
}

export const ComposerJumbotron = ({Title, Description} : props) => {
  return (
     <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {Title}
          </h1>
          <p className="text-gray-600 text-lg">{Description}</p>
        </div>
  )
}

