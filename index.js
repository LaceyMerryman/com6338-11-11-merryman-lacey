const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = ([poem]) => {
  const makeH2 = makeTag('h2')
  const makeH3 = makeTag('h3')
  const makeEm = makeTag('em')
  const makeP = makeTag('p')

  // Title and author section
  const titleHTML = makeH2(poem.title)
  const authorHTML = makeH3(makeEm(`by ${poem.author}`))

  // Group lines into stanzas
  const stanzas = poem.lines.reduce((acc, line) => {
    if (line === '') {
      acc.push([])
    } else {
      if (acc.length === 0) acc.push([])
      acc[acc.length - 1].push(line)
    }
    return acc
  }, [])

  // Use pipe to turn lines into <p> with <br> between lines
  const lineBreaks = lines =>
    lines.map((line, i) =>
      i === lines.length - 1 ? line : `${line}<br>`
    ).join('')

  const stanzaToParagraph = pipe(lineBreaks, makeP)
  const stanzaHTML = stanzas.map(stanzaToParagraph).join('')

  return titleHTML + authorHTML + stanzaHTML
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}

