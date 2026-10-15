// PT SmartTrack gym-owner survey, from "PT_SmartTrack_Gym_Owner_Survey_Questions.pdf".
//
// Plain ESM with no JSX so api/survey.js validates against the same list the
// page renders: an answer the page cannot offer is rejected by the server.
// `max` marks a select-up-to question (checkboxes); everything else is one
// choice (radios).

export const SURVEY_QUESTIONS = [
  {
    id: 'q1',
    text: 'How many active personal training (PT) clients does your gym currently have?',
    options: ['Less than 10', '10-25', '26-50', '51-100', 'More than 100'],
  },
  {
    id: 'q2',
    text: 'How do you currently track PT sessions?',
    options: [
      'Paper register',
      'Excel / Google Sheets',
      'Gym management software',
      'WhatsApp / manual messages',
      'We do not systematically track them',
    ],
  },
  {
    id: 'q3',
    text: 'What are your biggest PT management challenges?',
    max: 3,
    options: [
      'Tracking used and remaining sessions',
      'Trainer attendance and accountability',
      'Disputes over completed sessions',
      'Package expiry and renewals',
      'Refunds and package adjustments',
      'Trainer commissions and payments',
      'No major challenges',
    ],
  },
  {
    id: 'q4',
    text: 'How frequently do you face session tracking errors or disputes?',
    options: ['Very frequently', 'Sometimes', 'Rarely', 'Never', 'Not sure'],
  },
  {
    id: 'q5',
    text: 'How much time does your team spend managing PT records and follow-ups each week?',
    options: ['Less than 1 hour', '1-3 hours', '4-7 hours', 'More than 7 hours', 'Not sure'],
  },
  {
    id: 'q6',
    text: 'Which PT management tools do you currently use?',
    options: ['No software', 'Gym management software', 'Custom-built software', 'Spreadsheets / manual records'],
  },
  {
    id: 'q7',
    text: 'Which features would be most valuable?',
    max: 3,
    options: [
      'Trainer marks sessions through mobile',
      'Automatic session balance updates',
      'WhatsApp notifications to clients',
      'Owner dashboard and reporting',
      'Renewal reminders',
      'Client verification of sessions',
      'Refund and trainer payout tracking',
    ],
  },
  {
    id: 'q8',
    text: 'Would you consider using a dedicated PT management system alongside your current gym software?',
    options: [
      'Yes',
      'Maybe, if it integrates with existing software',
      'Only if it replaces our existing system',
      'No',
    ],
  },
  {
    id: 'q9',
    text: 'What monthly price would you consider reasonable if the system solves your main PT management problems?',
    options: ['Below INR 500', 'INR 500-999', 'INR 1,000-1,999', 'INR 2,000-3,000', 'Above INR 3,000', 'Would not pay for it'],
  },
  {
    id: 'q10',
    text: 'Would you be interested in testing an early version at your gym?',
    options: ['Yes', 'Maybe', 'No'],
  },
];

// The optional respondent details at the end of the form.
export const SURVEY_DETAILS = [
  { id: 'gymName', label: 'Gym name', max: 160 },
  { id: 'contactName', label: 'Contact name', max: 120 },
  { id: 'feedback', label: 'Additional feedback', max: 2000, long: true },
];
