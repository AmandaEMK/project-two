/*
GET https://api.smartable.ai/coronavirus/stats/global HTTP/1.1

Cache-Control: no-cache
Subscription-Key: d00c7834e9704372bad71fff4f715467
*/



var mapCountryList = {};

var simplemaps_worldmap_mapdata={
        main_settings: {
            //General settings
                width: "responsive",
            background_color: "#FFFFFF",
            background_transparent: "yes",
            popups: "detect",
            
                //State defaults
                state_description: "No data",
            state_color: "#bbcfdd",
            state_hover_color: "#3B729F",
            border_size: 1.5,
            border_color: "#ffffff",
            all_states_inactive: "no",
            all_states_zoomable: "no",
            
                //Label defaults
                label_color: "#ffffff",
            label_hover_color: "#ffffff",
            label_size: 22,
            label_font: "Arial",
            hide_labels: "no",
        
                //Zoom settings
                manual_zoom: "yes",
            back_image: "no",
            arrow_box: "no",
            navigation_size: "28",
            navigation_color: "#f7f7f7",
            navigation_border_color: "#636363",
            initial_back: "yes",
            initial_zoom: -1,
            initial_zoom_solo: "no",
            region_opacity: 1,
            region_hover_opacity: 0.6,
            zoom_out_incrementally: "yes",
            zoom_percentage: 0.99,
            zoom_time: 0.5,
            
                //Popup settings
                popup_color: "white",
            popup_opacity: 0.9,
            popup_shadow: 1,
            popup_corners: 5,
            popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
            popup_nocss: "no",
            
                //Advanced settings
                div: "worldmap",
            auto_load: "no",
            rotate: "0",
            url_new_tab: "yes",
            images_directory: "default",
            import_labels: "no",
            fade_time: 0.1,
            link_text: "View Website"
        },
        state_specific: mapCountryList,
        labels: {}
    };