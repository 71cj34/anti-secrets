addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    const pages = [
      "/.env",
      "/.env.old",
      "/core/.env",
      "/admin/config",
      "/.env.local",
      "/.aws/credentials",
      "/app_dev.php",
      "/public/.env",
  
      // **Configuration and Backup Files:**
      "/.htpasswd",
      "/.htaccess",
      "/wp-config.php", // WordPress configuration
      "/configuration.php", // Joomla configuration
      "/sites/default/settings.php", // Drupal configuration
      "/config/database.yml", // Rails database configuration
      "/config/secrets.yml", // Rails secrets
      "/WEB-INF/web.xml", // Java web application configuration
      "/application.ini", // Zend Framework configuration
      "/settings.inc.php", // PrestaShop configuration
      "/local.settings.php", // Drupal 8+ local settings
      "/typo3conf/LocalConfiguration.php", // TYPO3 configuration
      "/joomla.xml", // Joomla installation file (sometimes contains secrets)
      "/user/config/system.yaml", // Grav CMS configuration
      "/config.php", // Generic configuration file (check contents!)
      "/backup.sql",
      "/backup.zip",
      "/backup.tar.gz",
      "/backup.tar.bz2",
      "/db_backup.sql",
      "/db_config.php",
      "/database.sql",
      "/database.sql.gz",
      "/data/config/config.ini", // Another config file
      "/include/config.php", // Another config file
      "/includes/config.php", // Another config file
      "/sites/all/settings.php", // Drupal
      "/sites/default/files/civicrm/templates_c/en_US/%%051^051A8181%%CRM%%smarty.php", // Drupal CiviCRM vulnerability
      "/sites/default/settings.php~", // Drupal backup
  
      // **Version Control System Directories:**
      "/.git/config",
      "/.svn/entries",
      "/.hg/hgrc",
      "/.bzr/checkout/dirstate",
  
      // **Log Files:**
      "/error_log",
      "/errors.log",
      "/access.log",
      "/access_log",
      "/logs/error.log",
      "/logs/access.log",
      "/application.log",
      "/var/log/apache2/access.log",
      "/var/log/apache2/error.log",
      "/var/log/nginx/access.log",
      "/var/log/nginx/error.log",
      "/wp-content/debug.log", // WordPress debug log
  
      // **Debug and Development Files:**
      "/debug/toolbar", // Symfony debug toolbar
      "/phpinfo.php",
      "/info.php",
      "/test.php",
      "/index.php.bak",
      "/index.php~",
      "/COPYING",
      "/sitemap.xml",  // Can reveal internal paths and structure
  
      // **Admin and Management Interfaces (Often Unprotected):**
      "/admin",
      "/administrator",
      "/login",
      "/wp-admin", // WordPress admin
      "/wp-login.php", // WordPress login
      "/admin.php",
      "/backend",
      "/manager",
      "/controlpanel",
      "/cpanel",
      "/webmail",
      "/phpMyAdmin",
      "/pma",
      "/myadmin",
      "/mysqladmin",
      "/server-status", // Apache server status (if enabled)
      "/console", // JBoss console (if enabled)
      "/jenkins", // Jenkins CI server (if exposed)
      "/teamcity", // TeamCity CI server (if exposed)
      "/gitlab",  // GitLab instance (if exposed)
      "/stash",   // Atlassian Stash/Bitbucket (if exposed)
      "/bitbucket", // Atlassian Bitbucket (if exposed)
      "/jira",    // Atlassian Jira (if exposed)
      "/confluence", // Atlassian Confluence (if exposed)
      "/phpPgAdmin", // phpPgAdmin (PostgreSQL)
      "/pgadmin", // phpPgAdmin (PostgreSQL)
      "/roundcube", // Roundcube webmail
      "/squirrelmail", // Squirrelmail webmail
      "/awstats/awstats.pl", // AWStats web analytics
      "/webalizer/", // Webalizer web analytics
  
      // **API Endpoints (Remove if they need to be accessible)**
      "/api/v1/users",
      "/api/v2/users",
      "/api/debug",
      "/api/test",
      "/swagger",
      "/swagger.json",
      "/swagger.yaml",
      "/openapi.json",
      "/openapi.yaml",
      "/graphql",
      "/graphiql",
  
      // **Backup files (Common extensions)**
      "/*.bak",
      "/*.backup",
      "/*.old",
      "/*.orig",
      "/*.tmp",
      "/*.swp",
      "/*.save",
      "/*.ini.bak",
      "/*.config.bak",
      "/*.inc.bak",
  
      "/metadata",
  
      // **Specific Technology Stacks:**
      "/elmah.axd", // ASP.NET error logging handler (if enabled)
      "/trace.axd", // ASP.NET trace handler (if enabled)
      "/_profiler/phpinfo", // Symfony profiler (if exposed)
      "/server-info", // Apache server info (if enabled)
      "/server-status", // Apache server status (if enabled)
  
      // **Node.js specific**
      "/node_modules/",
      "/package.json",
      "/yarn.lock",
      "/pm2.config.js",
  
      // **Docker specific**
      "/docker-compose.yml",
      "/Dockerfile",
      "/docker-compose.override.yml",
      "/.dockerenv",
  
      // **Kubernetes specific**
      "/.kube/config",
  
      // **Database Management**
      "/dbadmin",
      "/sqliteadmin",
      "/phpredmin",
      "/redisadmin",
  
      // **Content Management Systems**
      "/modules/php/php.ini", // Drupal php.ini exposure vulnerability
      "/sites/default/settings.php", // Drupal settings file
      "/administrator/cache/config.php", // Joomla cache config file
  
      // **Search Engine Specific Files**
      "/searchconsole",
      "/BingSiteAuth.xml",
  
      // **Serverless Functions**
      "/.netlify/functions/",
      "/.vercel/output/",
  
      // **Reverse Proxy Configuration**
      "/nginx.conf",
      "/apache2.conf",
      "/httpd.conf",
      "/haproxy.cfg",
  
      // **API keys**
      "/key.pem",
      "/api_key.txt",
      "/keys.txt",
  
      // **Common Application Paths**
      "/uploads/",
      "/files/",
      "/images/",
      "/assets/",
      "/static/",
  
      // **Wordpress themes and plugins**
      "/wp-content/themes/",
      "/wp-content/plugins/",
      "/wp-content/uploads/",
      "/wp-includes/",
      "/wp-admin/install.php",
      "/xmlrpc.php",
  
      // **Magento**
      "/app/etc/env.php",
      "/downloader/",
  
      // **OS Command Injection Testing**
      "/cgi-bin/test.cgi",
      "/cgi-bin/status",
      "/cgi-bin/php.cgi",
  ];
  
  
    if (pages.includes(url.pathname)) {
    const message = `
    {
      "DB_HOST": "admin",
      "DB_PORT": "5432",
      "DB_USERNAME": "admin",
      "DB_PASSWORD": "password",
      "DB_NAME": "nice-try",
      "API_KEY_FIREBASE": "AIzaSyREAL-API-KEY-F1ReBAS2E-Fi1REBSD",
      "API_KEY_GOOGLE_MAPS": "gbnEpBREAL-API-KEY-FOR-GOOGLE-MAPS",
      "API_KEY_STRIPE": "sk_test_4rfPnw2bauqwBvkq21,
      "API_KEY_TWILIO": "ACxxxxxxxxxxxxxxxxxxVueBqoDjX",
      "API_KEY_AWS_ACCESS": "AKxOjbwHvyQvfHoa",
      "API_KEY_AWS_SECRET": "z2KvbPk/W1ahFaKeSeCrEtACC3SSkEy",
      "OAUTH_CLIENT_ID": "nice-try.apps.googleusercontent.com",
      "OAUTH_CLIENT_SECRET": "sk-v1-u1i19928zygr2rbh4v1",
      "OAUTH_REDIRECT_URI": "http://nice-try.com/oauth_callback",
      "MAIL_HOST": "smtp.mailprovider.com",
      "MAIL_PORT": "587",
      "MAIL_USERNAME": "admin",
      "MAIL_PASSWORD": "password1",
      "JWT_SECRET": "sk-v1-abv871i28z0ka1",
      "SECRET_KEY": "sk-v1-44817263192837",
      "REDIS_HOST": "fake_redis_host",
      "REDIS_PORT": "6379",
      "REDIS_PASSWORD": "password",
      "PUBLIC_URL": "https://nice-try.com",
      "DEBUG_MODE": true
    }
    `;
      return new Response(JSON.stringify(message), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return fetch(request);
    }
  }
