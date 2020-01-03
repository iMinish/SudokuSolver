import Data.List

type Board    = Matrix Char
type Matrix a = [Row a]
type Row a    = [a]

-- VALID easy BOARD (7 BLANKS)
easy :: Board
easy = ["995743861",
        "431-65927",
        "876192543",
        "3-7459216",
        "612387495",
        "5-921-738",
        "763524189",
        "92-671354",
        "1-4938672"]

-- VALID medium BOARD (38 BLANKS)
medium :: Board
medium = ["--57-38--",
          "-31-65-27",
          "-7-1-2-43",
          "3-7-5---6",
          "6---8----",
          "5-9-1-738",
          "-6-5-4-89",
          "-2--71-54",
          "1-49-86-2"]

-- VALID hard BOARD (37 BLANKS ... TAKES ROUGHLY 2 MINUTES)
hard :: Board
hard = ["--3516789",
        "--58---46",
        "-187--2--",
        "----549-8",
        "8-93-----",
        "-72-9--3-",
        "-37--5--2",
        "---67--15",
        "256431897"]

-- INVALID error BOARD (0 BLANKS)
error :: Board
error = ["123456789",
         "123456789",
         "123456789",
         "123456789",
         "123456789",
         "123456789",
         "123456789",
         "123456789",
         "123456789"]

isSingleMark :: [a] -> Bool
isSingleMark [_] = True
isSingleMark _   = False

isRepeatedDigit :: Eq a => [a] -> Bool
isRepeatedDigit []       = True
isRepeatedDigit (x : xs) = not (x `elem` xs) && isRepeatedDigit xs

chunksOf :: Int -> [a] -> [[a]]
chunksOf a [] = []
chunksOf a xs = take a xs : chunksOf a (drop a xs)

checkSudoku :: Board -> Bool
checkSudoku a = all isRepeatedDigit (getRows a) &&
                all isRepeatedDigit (getColumns a) &&
                all isRepeatedDigit (getBlocks a)
                where
                  getRows = id
                  getColumns = transpose
                  getBlocks = (map concat . concat) . map getColumns . ((chunksOf 3) . map (chunksOf 3)) -- ESSENTIALLY UNPACKING <- MAPPING COLUMNS <- PACKING

searchSudoku :: Matrix [Char] -> Matrix [Char]
searchSudoku = narrowBy getBlocks . narrowBy getColumns . narrowBy getRows
               where
                getRows = id
                getColumns = transpose
                getBlocks = (map concat . concat) . map getColumns . ((chunksOf 3) . map (chunksOf 3))
                narrowBy a = a . map reduce . a
                  where
                  reduce xs = map (`minus` (singles xs)) xs
                    where
                      singles = concat . (filter isSingleMark)
                      xs `minus` ys = if isSingleMark xs then xs else xs \\ ys -- "\\" IS LIST DIFFERENCE

solveSudoku :: Board -> [Board]
solveSudoku = filter checkSudoku . cartesianProduct . searchSudoku . markBlanks
              where
                cartesianProduct = sequence . map sequence
                markBlanks = map (map (\a -> if a == '-' then ['1'..'9'] else [a]))

main :: IO ()
main = do
  putStrLn "Input Sudoku Board (UNSOLVED):"
  let inputBoard = easy -- EDIT THIS LINE TO TEST DIFFERENT BOARDS
  putStrLn (unlines inputBoard)
  putStrLn "Is inputBoard a VALID and COMPLETE Sudoku Board?"
  print (checkSudoku inputBoard)

  case (solveSudoku inputBoard) of
    [] -> putStrLn "\nERROR: Could NOT solve inputBoard"
    (outputBoard : _) -> do
                putStrLn "\nOutput Sudoku Board (SOLVED):"
                putStrLn (unlines (outputBoard))
                putStrLn "Is outputBoard a VALID and COMPLETE Sudoku Board?"
                print (checkSudoku outputBoard)
