// Hard-coded fallback data for images
const EVENT_IMAGES = {
  'art-exhibitions': ['20240302grd-opening-rm02.jpg', '20240302grd-opening-rm07.jpg', '20240405sa-show-rm05.jpg', '20240919class-de05.jpg', '20241210ad-opening07.jpg', '20250131iad-showopen04.jpg', '20250131iad-showopen08.jpg'],
  'artist-series': ['20241029artist-series-de27.jpg', '20241029artist-series-de30.jpg', '20241031cyrano-de20.jpg', '20241212handels-messiah-de55.jpg', '20250124weisenthal-de34.jpg', 'AM5A0003.jpg', 'AM5A0066.jpg', 'AM5A9956.jpg', 'Greg Hamilton 1.jpg'],
  'bible-conference': ['20250220bibleconf-tn00101.jpg', '20250220bibleconf-tn00202.jpg', '20250220bibleconf-tn00303.jpg', '20250220bibleconf-tn00404.jpg', '20250220bibleconf-tn00505.jpg', '20250220bibleconf-tn00606.jpg', '20250220bibleconf-tn00707.jpg', '20250220bibleconf-tn00808.jpg', '20250220bibleconf-tn00909.jpg', '20250220bibleconf-tn01010.jpg', '20250221bible-conf-de17.jpg', '20250221bible-conf-de79.jpg', '20250221bible-conf-de83.jpg'],
  'campus-renovations': ['20240909business-wing-de04.jpg', '20240909business-wing-de10.jpg', '20240909business-wing-de14.jpg', '20240909business-wing-de18.jpg', '20240909business-wing-de19.jpg'],
  'chapel': ['20240909chapel-de09.jpg', '20240909chapel-de19.jpg', '20241007chapel-de26.jpg'],
  'christmas': ['20241206christmas-celebration-de037.jpg', '20241206christmas-celebration-de040.jpg', '20241206christmas-celebration-de056.jpg', '20241206christmas-celebration-de057.jpg', '20241206christmas-celebration-de065.jpg', '20241206christmas-celebration-de070.jpg', '20241206christmas-celebration-de083.jpg', '20241206christmas-celebration-de088.jpg', '20241206student-appreciation-de10.jpg', '20241206student-appreciation-de23.jpg', '20241217christmas-cardboard-de35.jpg', '20241217student-body-program-de51.jpg'],
  'commencement': ['20240503commencement-de021.jpg', '20240503commencement-de261.jpg', '20240503commencement-de275.jpg', '20240503commencement-tn272.jpg'],
  'harvest-fest': ['20241101harvest-fest-de04.jpg', '20241101harvest-fest-de15.jpg', '20241101harvest-fest-de22.jpg', '20241101harvest-fest-de26.jpg', '20241101harvest-fest-de27.jpg', '20241101harvest-fest-de30.jpg', '20241101harvest-fest-de57.jpg', '20241101harvest-fest-de59.jpg'],
  'homecoming': ['20241012homecoming-de113.jpg', '20241012homecoming-de138.jpg', '20241012homecoming-de200.jpg', '20241012homecoming-de201.jpg'],
  'hurricane-helene': ['20240930hurricane-de02.jpg', '20240930hurricane-de03.jpg', '20240930hurricane-de09.jpg', '20240930hurricane-de12.jpg', '20241001restoration-de1.jpg', '20241001restoration-de3.jpg'],
  'new-president': ['20240507pres-crockett-de088.jpg', '20240507pres-crockett-de129.jpg', '20240621orientation-hc003.jpg', '20240813student-development-de04-0.jpg', '20240823move-in-de038.jpg', '20240827evang-mtg-de14.jpg', '20240828evang-mtg-de20.jpg', '20240905remember911-de21.jpg', '20240913rush-party-de66.jpg', '20241030chapel-de02.jpg'],
  'society-rush': ['20240913rush-party-de19.jpg', '20240913rush-party-de49.jpg', '20240913rush-party-de59.jpg', '20240913rush-party-de65.jpg', '20240913rush-party-de68.jpg'],
  'theater': ['20240229wonderland-de038.jpg', '20240229wonderland-de058.jpg', '20241023wait-untill-dark-de01.jpg', '20241023wait-untill-dark-de02.jpg', '20241023wait-untill-dark-de13.jpg'],
  'turkey-bowl': ['20241116turkey-bowl-ew022.jpg', '20241116turkey-bowl-ew028.jpg', '20241116turkey-bowl-ew032.jpg', '20241116turkey-bowl-ew033.jpg', '20241116turkey-bowl-ew049.jpg', '20241116turkey-bowl-ew055.jpg', '20241116turkey-bowl-ew068.jpg', '20241116turkey-bowl-ew103.jpg', '20241116turkey-bowl-ew104.jpg', '20241116turkey-bowl-ew113.jpg', '20241116turkey-bowl-ew115.jpg', '20241116turkey-bowl-ew117.jpg', '20241116turkey-bowl-ew120.jpg', '20241116turkey-bowl-ew128.jpg', '20241116turkey-bowl-ew129.jpg'],
  'welcome-week': ['20240823move-in-de016.jpg', '20240823move-in-de085.jpg', '20240823move-in-de148.jpg']
};

const GROUP_IMAGES = {
  'academic-teams': ['01.jpg', '20241017-Robotics-Team-SR1.jpg', '20241017-Robotics-Team-SR2.jpg', '20241017-Robotics-Team-SR3.jpg'],
  'baseball-team': ['20240423bsb-brevard-me210.jpg', '20240423bsb-brevard-me226.jpg', '20240426bsb-mid-atl-me105.jpg', '20240426bsb-mid-atl-me155.jpg', '20240426bsb-mid-atl-me233.jpg', '20240427bsb-mid-atl-me456.jpg', '20240427bsb-mid-atl-me569.jpg', '20240427bsb-mid-atl-me622.jpg', '20240427bsb-mid-atl-me627.jpg'],
  'basketball-teams': ['20250117mbb-vs-pcc-km10.jpg', '20250117mbb-vs-pcc-km15.jpg', '20250117wbb-vs-pcc-km03.jpg', '20250117wbb-vs-pcc-km07.jpg', '20250117wbb-vs-pcc-km08.jpg'],
  'campus-media': ['20241024-Vintage-SR1.jpg', '20241024-Vintage-SR2-0.jpg', '20241025-Collegian-SR1.jpg', '20241025-Collegian-SR2.jpg', '20241025-Collegian-SR3.jpg', '20241025-Collegian-SR4.jpg'],
  'cross-country': ['20240427tf-app-state-an027.jpg', '20240427tf-app-state-an065.jpg', '20240427tf-app-state-an102.jpg', '20240819xc-team-hc006.jpg'],
  'csc-cgo': ['20211114-cgo-tl9.jpg', '20240926reach-week-de24.jpg', '20241031blood-drive-de20.jpg', '20241113-cgo-vn1.jpg', 'IMG_0071.jpg', 'IMG_0079.jpg', 'IMG_2968.jpg'],
  'discipleship-groups': ['20211106-discipleship-groups-tl1.jpg', '20211106-discipleship-groups-tl14.jpg', '20241107-discipleship-groups-sr1.jpg', '20241107-discipleship-groups-sr4.jpg', '20241107-discipleship-groups-sr7.jpg', '20241107-discipleship-groups-sr8.jpg'],
  'golf': ['20240612golf-jrcamp-wk017.jpg', '20240613golf-jrcamp-tn064.jpg'],
  'instrumental-groups': ['20241012homecoming-de124.jpg', '20241012homecoming-de139.jpg', '20241012homecoming-de142.jpg', '20241012homecoming-de149.jpg', '20241206christmas-celebration-de103.jpg'],
  'mission-teams': ['01.jpg', 'IMG_1628.jpg', 'IMG_2237.jpg', 'IMG_2351.jpg', 'IMG_2366.jpg', 'IMG_2571.jpg'],
  // Add missing groups
  'practicums-and-internships': ['20241026-Internship-SR1.jpg'],
  'research-teams': ['01.jpg', '20230928exp-expo-an022.jpg', '20240404scsl-ps237.jpg', '20240619cancer-rsrch-tn016.jpg'],
  'seminary': ['20211114-seminary-tl1.jpg', '20211114-seminary-tl2.jpg', '20241113seminarychap-aw02.jpg', '20241113seminarychap-aw03.jpg', '20241113seminarychap-aw04.jpg', '20241113seminarychap-aw10.jpg'],
  'soccer': ['20240819msoc-team-hc005.jpg', '20240819wsoc-team-hc006.jpg', '20240928msoc-vs-pcc-de14.jpg', '20240928msoc-vs-pcc-de48.jpg', '20240928msoc-vs-pcc-de83.jpg', '20241012homecoming-de198.jpg', '20241012homecoming-de212.jpg', '20241012homecoming-de228.jpg'],
  'study-abroad': ['StudyAbroad_1.jpg', 'StudyAbroad_2.jpg', 'StudyAbroad_3.jpg', 'StudyAbroad_4.jpg', 'StudyAbroad_5.jpg'],
  'volleyball': ['20241016wvball-vs-piedmont-de02.jpg', '20241016wvball-vs-piedmont-de08.jpg', '20241016wvball-vs-piedmont-de14.jpg', '20241016wvball-vs-piedmont-de31.jpg', '20241016wvball-vs-piedmont-de45.jpg', '20241016wvball-vs-piedmont-de55.jpg']
};

/**
 * Get all images for a specific event
 * @param {string} eventSlug - The event slug/folder name
 * @returns {Array} - Array of image filenames
 */
export async function getEventImages(eventSlug) {
  try {
    console.log(`Getting images for event: ${eventSlug}`);
    
    // Try API first
    try {
      const baseUrl = getBaseUrl();
      const url = `${baseUrl}/api/images/events/${eventSlug}`;
      console.log(`Fetching images from URL: ${url}`);
      
      const response = await fetch(url);
      console.log(`Image API response status for ${eventSlug}:`, response.status);
      
      if (response.ok) {
        const images = await response.json();
        console.log(`Received ${images.length} images for ${eventSlug} from API`);
        
        if (images && images.length > 0 && images[0] !== 'placeholder.jpg') {
          return images;
        }
      }
      
      console.log(`API request failed or returned placeholder, using fallback data for ${eventSlug}`);
    } catch (apiError) {
      console.error(`Error fetching images from API for ${eventSlug}:`, apiError);
    }
    
    // Use fallback data if API request fails
    if (EVENT_IMAGES[eventSlug]) {
      console.log(`Using fallback image data for event ${eventSlug}: ${EVENT_IMAGES[eventSlug].length} images`);
      return EVENT_IMAGES[eventSlug];
    }
    
    // Return a placeholder if no images found
    console.log(`No images found for event ${eventSlug}, returning empty array`);
    return [];
  } catch (error) {
    console.error(`Error loading images for event ${eventSlug}:`, error);
    return [];
  }
}

/**
 * Get all images for a specific group
 * @param {string} groupSlug - The group slug/folder name
 * @returns {Array} - Array of image filenames
 */
export async function getGroupImages(groupSlug) {
  try {
    console.log(`Getting images for group: ${groupSlug}`);
    
    // Try API first
    try {
      const baseUrl = getBaseUrl();
      const url = `${baseUrl}/api/images/groups/${groupSlug}`;
      console.log(`Fetching images from URL: ${url}`);
      
      const response = await fetch(url);
      console.log(`Image API response status for ${groupSlug}:`, response.status);
      
      if (response.ok) {
        const images = await response.json();
        console.log(`Received ${images.length} images for ${groupSlug} from API`);
        
        if (images && images.length > 0 && images[0] !== 'placeholder.jpg') {
          return images;
        }
      }
      
      console.log(`API request failed or returned placeholder, using fallback data for ${groupSlug}`);
    } catch (apiError) {
      console.error(`Error fetching images from API for ${groupSlug}:`, apiError);
    }
    
    // Use fallback data if API request fails
    if (GROUP_IMAGES[groupSlug]) {
      console.log(`Using fallback image data for group ${groupSlug}: ${GROUP_IMAGES[groupSlug].length} images`);
      return GROUP_IMAGES[groupSlug];
    }
    
    // Return a placeholder if no images found
    console.log(`No images found for group ${groupSlug}, returning empty array`);
    return [];
  } catch (error) {
    console.error(`Error loading images for group ${groupSlug}:`, error);
    return [];
  }
}

/**
 * Helper to get the base URL for content
 * This ensures we use absolute paths
 */
function getBaseUrl() {
  // In the browser, window.location gives us the current URL
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    return url.origin; // e.g., "https://your-s3-bucket.amazonaws.com"
  }
  return ''; // During SSR, just use relative paths
}

/**
 * Helper to get the first image for a thumbnail
 * @param {string} type - 'events' or 'groups'
 * @param {string} slug - The slug/folder name
 * @returns {string} - Path to the first image or a default image
 */
export async function getThumbnailImage(type, slug) {
  try {
    console.log(`Getting thumbnail for ${type}/${slug}`);
    
    // Fallback mapping for known content
    const knownImages = {
      'events': {
        'art-exhibitions': '20240302grd-opening-rm02',
        'artist-series': '20241029artist-series-de27',
        'bible-conference': '20250220bibleconf-tn00101',
        'campus-renovations': '20240909business-wing-de04',
        'chapel': '20240909chapel-de09',
        'christmas': '20241206christmas-celebration-de037',
        'commencement': '20240503commencement-de021',
        'harvest-fest': '20241101harvest-fest-de04',
        'homecoming': '20241012homecoming-de113',
        'hurricane-helene': '20240930hurricane-de02',
        'new-president': '20240507pres-crockett-de088',
        'society-rush': '20240913rush-party-de19',
        'theater': '20240229wonderland-de038',
        'turkey-bowl': '20241116turkey-bowl-ew022',
        'welcome-week': '20240823move-in-de016'
      },
      'groups': {
        'academic-teams': '01',
        'baseball-team': '20240423bsb-brevard-me210',
        'basketball-teams': '20250117mbb-vs-pcc-km10',
        'campus-media': '20241024-Vintage-SR1',
        'cross-country': '20240427tf-app-state-an027',
        'csc-cgo': '20211114-cgo-tl9',
        'discipleship-groups': '20211106-discipleship-groups-tl1',
        'golf': '20240612golf-jrcamp-wk017',
        'instrumental-groups': '20241012homecoming-de124',
        'mission-teams': '01',
        'practicums-and-internships': 'placeholder',
        'research-teams': 'placeholder',
        'seminary': 'placeholder',
        'soccer': 'placeholder',
        'study-abroad': 'placeholder',
        'volleyball': 'placeholder'
      }
    };
    
    // Try to use API first
    try {
      const images = type === 'events' 
        ? await getEventImages(slug)
        : await getGroupImages(slug);
      
      if (images && images.length > 0) {
        // For placeholder.jpg, use the placeholder image we created
        if (images[0] === 'placeholder.jpg') {
          const baseUrl = getBaseUrl();
          return `${baseUrl}/images/${type}/placeholder/placeholder.jpg`;
        }
        
        // Use compressed version for thumbnails
        const imageName = images[0];
        const ext = imageName.split('.').pop();
        const baseName = imageName.substring(0, imageName.length - ext.length - 1);
        
        // Always use the compressed version for thumbnails on listing pages
        const baseUrl = getBaseUrl();
        return `${baseUrl}/images/${type}/${slug}/${baseName}_compressed.${ext}`;
      }
    } catch (error) {
      console.error(`Error getting images from API for ${type}/${slug}:`, error);
    }
    
    // Use fallback for known content
    if (knownImages[type] && knownImages[type][slug]) {
      const imageName = knownImages[type][slug];
      const baseUrl = getBaseUrl();
      
      if (imageName === 'placeholder') {
        return `${baseUrl}/images/placeholder_compressed.jpg`;
      }
      
      return `${baseUrl}/images/${type}/${slug}/${imageName}_compressed.jpg`;
    }
    
    // Return fallback to cover image when no specific images found
    const baseUrl = getBaseUrl();
    return `${baseUrl}/images/cover/cover-full_compressed.jpg`;
  } catch (error) {
    console.error(`Error getting thumbnail for ${type}/${slug}:`, error);
    // Use cover image as fallback
    const baseUrl = getBaseUrl();
    return `${baseUrl}/images/cover/cover-full_compressed.jpg`;
  }
}
