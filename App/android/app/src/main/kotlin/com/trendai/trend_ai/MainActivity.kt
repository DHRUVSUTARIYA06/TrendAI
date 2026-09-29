package com.trendai.trend_ai

import android.content.ClipData
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import androidx.core.content.FileProvider
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import java.io.File

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.trendai.app/chatgpt"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "openChatGPT" -> {
                    val imagePath = call.argument<String>("imagePath")
                    val prompt = call.argument<String>("prompt") ?: ""
                    val success = launchChatGPT(imagePath, prompt)
                    result.success(success)
                }
                "shareGeneral" -> {
                    val imagePath = call.argument<String>("imagePath")
                    val prompt = call.argument<String>("prompt") ?: ""
                    val success = launchChooser(imagePath, prompt)
                    result.success(success)
                }
                "isChatGPTInstalled" -> {
                    result.success(checkChatGPTInstalled())
                }
                else -> {
                    result.notImplemented()
                }
            }
        }
    }

    private fun checkChatGPTInstalled(): Boolean {
        return try {
            packageManager.getPackageInfo("com.openai.chatgpt", 0)
            true
        } catch (e: PackageManager.NameNotFoundException) {
            false
        } catch (e: Exception) {
            false
        }
    }

    private fun launchChatGPT(imagePath: String?, prompt: String): Boolean {
        try {
            val intent = Intent(Intent.ACTION_SEND).apply {
                putExtra(Intent.EXTRA_TEXT, prompt)
                setPackage("com.openai.chatgpt")

                if (!imagePath.isNullOrBlank()) {
                    val file = File(imagePath)
                    if (file.exists()) {
                        type = "image/*"
                        val contentUri: Uri = FileProvider.getUriForFile(
                            this@MainActivity,
                            "${applicationContext.packageName}.fileprovider",
                            file
                        )
                        putExtra(Intent.EXTRA_STREAM, contentUri)
                        clipData = ClipData.newRawUri("image", contentUri)
                        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    } else {
                        type = "text/plain"
                    }
                } else {
                    type = "text/plain"
                }

                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }

            val activities = packageManager.queryIntentActivities(intent, 0)
            if (activities.isNotEmpty()) {
                startActivity(intent)
                return true
            }

            // Fallback: check if we can open ChatGPT main page or intent
            val launchIntent = packageManager.getLaunchIntentForPackage("com.openai.chatgpt")
            if (launchIntent != null) {
                launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                startActivity(launchIntent)
                return true
            }

            return false
        } catch (e: Exception) {
            e.printStackTrace()
            return false
        }
    }

    private fun launchChooser(imagePath: String?, prompt: String): Boolean {
        try {
            val intent = Intent(Intent.ACTION_SEND).apply {
                putExtra(Intent.EXTRA_TEXT, prompt)

                if (!imagePath.isNullOrBlank()) {
                    val file = File(imagePath)
                    if (file.exists()) {
                        type = "image/*"
                        val contentUri: Uri = FileProvider.getUriForFile(
                            this@MainActivity,
                            "${applicationContext.packageName}.fileprovider",
                            file
                        )
                        putExtra(Intent.EXTRA_STREAM, contentUri)
                        clipData = ClipData.newRawUri("image", contentUri)
                        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    } else {
                        type = "text/plain"
                    }
                } else {
                    type = "text/plain"
                }
            }

            val chooser = Intent.createChooser(intent, "Create with ChatGPT / Share")
            chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            startActivity(chooser)
            return true
        } catch (e: Exception) {
            e.printStackTrace()
            return false
        }
    }
}
