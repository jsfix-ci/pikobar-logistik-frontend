export default {
  SET_LIST_OUTGOING_MAIL: (state, data) => {
    state.listOutgoingMail = data
  },
  SET_TOTAL_LIST_OUTGOING_MAIL: (state, data) => {
    state.totalListOutgoingMail = data
  },
  SET_TOTAL_DATA_OUTGOING_MAIL: (state, data) => {
    state.totalDataOutgoingMail = data
  },
  SET_LIST_INCOMING_MAIL: (state, data) => {
    state.listIncomingMail = data
  },
  SET_TOTAL_LIST_INCOMING_MAIL: (state, data) => {
    state.totalListIncomingMail = data
  },
  SET_TOTAL_DATA_INCOMING_MAIL: (state, data) => {
    state.totalDataIncomingMail = data
  },
  SET_APPLICATION_LETTER: (state, data) => {
    state.applicationLetter = data
  },
  SET_DETAIL_LETTER: (state, data) => {
    state.detailLetter = data
  },
  SET_DETAIL_LETTER_APPLICATION: (state, data) => {
    state.detailLetterApplication = data
  },
  SET_TOTAL_LIST_OUTGOING_MAIL_APPLICATION: (state, data) => {
    state.totalListLetterApplication = data
  },
  SET_TOTAL_DATA_OUTGOING_MAIL_APPLICATION: (state, data) => {
    state.totalDataLetterApplication = data
  },
  SET_TOTAL_LIST_INCOMING_MAIL_APPLICATION: (state, data) => {
    state.totalListLetterApplication = data
  },
  SET_TOTAL_DATA_INCOMING_MAIL_APPLICATION: (state, data) => {
    state.totalDataLetterApplication = data
  },
  SET_DETAIL_LETTER_PRINT: (state, data) => {
    state.detailLetterPrint = data
  }
}
