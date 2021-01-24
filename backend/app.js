import express from 'express'
import researchRouter from './src/router/ResearchRouter'
import realtimeRouter from './src/router/RealTimeRouter'
import watchlistRouter from './src/router/WatchlistRouter'

const app = express();

// app.use('/', stockRouter)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/research', researchRouter)
app.use('/realtime', realtimeRouter)
app.use('/watchlist', watchlistRouter)

export default app;