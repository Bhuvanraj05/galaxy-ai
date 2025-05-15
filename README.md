# Galaxy AI - Lab Intelligence Platform

Galaxy AI is an AI-driven lab intelligence platform for laboratory management and analytics. It integrates with various lab data sources to provide insights, analytics, and a powerful chatbot interface for lab managers, QA analysts, data scientists, and other lab personnel.

## Features

- **AI-Assisted Chatbot**: Ask questions about your lab data and get instant insights
- **Dynamic Reports**: Auto-generated and custom reports based on your lab data
- **Analytics Dashboard**: Visualize trends, anomalies, and forecasts
- **Multiple Data Source Integration**: Connect with LIMS, MES, SCADA, ERP, ELN, QMS and more
- **Knowledge base Management**: Upload and manage critical lab documents
- **Alerts & Notifications**: Auto-generated alerts based on data patterns

## Tech Stack

- Next.js 14 for frontend and API routes
- TypeScript for type safety
- Tailwind CSS for styling
- Recharts for data visualization
- Heroicons for iconography

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd galaxy-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Onboarding

When first accessing Galaxy AI, users will go through an onboarding process to:
1. Select their industry
2. Choose their role
3. Map industry categories
4. Connect data sources
5. Upload knowledge base

### Chat Interface

The AI-assisted chatbot on the home page allows users to:
- Select data sources to query
- Ask questions in natural language
- View visualizations and insights in-line
- Share or export responses

### Reports

The Reports section provides:
- Auto-generated summaries after data imports
- Custom report creation with user-defined filters
- Saved report templates for reuse

## Roadmap

- Real-time data synchronization
- Advanced document tagging and metadata
- Mobile application
- Integration with more data sources
- Expanded analytics capabilities

## License

[MIT License](LICENSE) 