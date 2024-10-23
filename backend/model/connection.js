const supabase = require("@supabase/supabase-js")
const SUPABASE_URL = "https://dvggwgmagcepexldgaku.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Z2d3Z21hZ2NlcGV4bGRnYWt1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTQ3MDM3OCwiZXhwIjoyMDQ1MDQ2Mzc4fQ.knO_oyWHHIuNpNp71LtZ8iNytzCHZeS9fuQmnQv-N94"
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)



module.exports = db