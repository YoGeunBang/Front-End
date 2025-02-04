export const GA_TRACKING_ID = 'G-RPHHQWK35D'; // 측정ID 설정: .env 파일로 관리해도된다.
export const GTM_ID = 'GTM-5GVT87H';
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};